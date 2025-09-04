import Member from '../models/Member.js';
import connectDB from '../config/database.js';

export class MemberController {
    
    // Get all members
    static async getAllMembers(req, res) {
        try {
            await connectDB();
            
            const { 
                status, 
                membershipType, 
                department,
                page = 1, 
                limit = 10,
                sortBy = 'joinDate',
                sortOrder = 'desc',
                search
            } = req.query;
            
            // Build filter object
            const filter = { isActive: true };
            if (status) filter.status = status;
            if (membershipType) filter.membershipType = membershipType;
            if (department) filter.department = department;
            
            // Add search functionality
            if (search) {
                filter.$or = [
                    { firstName: { $regex: search, $options: 'i' } },
                    { lastName: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { role: { $regex: search, $options: 'i' } },
                    { 'skills.name': { $regex: search, $options: 'i' } }
                ];
            }
            
            // Build sort object
            const sort = {};
            sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
            
            // Calculate pagination
            const skip = (page - 1) * limit;
            
            const members = await Member.find(filter)
                .sort(sort)
                .skip(skip)
                .limit(parseInt(limit));
                
            const total = await Member.countDocuments(filter);
            
            // Add contribution scores
            const membersWithScores = members.map(member => {
                const memberObj = member.toObject();
                memberObj.contributionScore = member.calculateContributionScore();
                return memberObj;
            });
            
            return res.status(200).json({
                success: true,
                data: membersWithScores,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / limit)
                }
            });
            
        } catch (error) {
            console.error('Error fetching members:', error);
            return res.status(500).json({
                success: false,
                message: 'Error fetching members',
                error: error.message
            });
        }
    }
    
    // Get member by ID
    static async getMemberById(req, res) {
        try {
            await connectDB();
            
            const { id } = req.params;
            const member = await Member.findById(id);
            
            if (!member || !member.isActive) {
                return res.status(404).json({
                    success: false,
                    message: 'Member not found'
                });
            }
            
            const memberObj = member.toObject();
            memberObj.contributionScore = member.calculateContributionScore();
            
            return res.status(200).json({
                success: true,
                data: memberObj
            });
            
        } catch (error) {
            console.error('Error fetching member:', error);
            return res.status(500).json({
                success: false,
                message: 'Error fetching member',
                error: error.message
            });
        }
    }
    
    // Create new member
    static async createMember(req, res) {
        try {
            await connectDB();
            
            const memberData = req.body;
            
            // Check if email already exists
            const existingMember = await Member.findOne({ 
                email: memberData.email,
                isActive: true 
            });
            
            if (existingMember) {
                return res.status(400).json({
                    success: false,
                    message: 'A member with this email already exists'
                });
            }
            
            const member = new Member(memberData);
            await member.save();
            
            return res.status(201).json({
                success: true,
                message: 'Member created successfully',
                data: member
            });
            
        } catch (error) {
            console.error('Error creating member:', error);
            
            if (error.code === 11000) {
                return res.status(400).json({
                    success: false,
                    message: 'A member with this email already exists'
                });
            }
            
            return res.status(500).json({
                success: false,
                message: 'Error creating member',
                error: error.message
            });
        }
    }
    
    // Update member
    static async updateMember(req, res) {
        try {
            await connectDB();
            
            const { id } = req.params;
            const updateData = req.body;
            
            // Remove id from update data if present
            delete updateData._id;
            
            const member = await Member.findByIdAndUpdate(
                id, 
                updateData, 
                { 
                    new: true, 
                    runValidators: true 
                }
            );
            
            if (!member || !member.isActive) {
                return res.status(404).json({
                    success: false,
                    message: 'Member not found'
                });
            }
            
            return res.status(200).json({
                success: true,
                message: 'Member updated successfully',
                data: member
            });
            
        } catch (error) {
            console.error('Error updating member:', error);
            return res.status(500).json({
                success: false,
                message: 'Error updating member',
                error: error.message
            });
        }
    }
    
    // Delete member (soft delete)
    static async deleteMember(req, res) {
        try {
            await connectDB();
            
            const { id } = req.params;
            const member = await Member.findByIdAndUpdate(
                id,
                { isActive: false },
                { new: true }
            );
            
            if (!member) {
                return res.status(404).json({
                    success: false,
                    message: 'Member not found'
                });
            }
            
            return res.status(200).json({
                success: true,
                message: 'Member deleted successfully'
            });
            
        } catch (error) {
            console.error('Error deleting member:', error);
            return res.status(500).json({
                success: false,
                message: 'Error deleting member',
                error: error.message
            });
        }
    }
    
    // Update member status
    static async updateMemberStatus(req, res) {
        try {
            await connectDB();
            
            const { id } = req.params;
            const { status } = req.body;
            
            const member = await Member.findByIdAndUpdate(
                id,
                { status, lastActive: new Date() },
                { new: true }
            );
            
            if (!member || !member.isActive) {
                return res.status(404).json({
                    success: false,
                    message: 'Member not found'
                });
            }
            
            return res.status(200).json({
                success: true,
                message: 'Member status updated successfully',
                data: member
            });
            
        } catch (error) {
            console.error('Error updating member status:', error);
            return res.status(500).json({
                success: false,
                message: 'Error updating member status',
                error: error.message
            });
        }
    }
    
    // Get active members
    static async getActiveMembers(req, res) {
        try {
            await connectDB();
            
            const members = await Member.getActiveMembers();
            
            return res.status(200).json({
                success: true,
                data: members
            });
            
        } catch (error) {
            console.error('Error fetching active members:', error);
            return res.status(500).json({
                success: false,
                message: 'Error fetching active members',
                error: error.message
            });
        }
    }
    
    // Get members by department
    static async getMembersByDepartment(req, res) {
        try {
            await connectDB();
            
            const { department } = req.params;
            const members = await Member.getMembersByDepartment(department);
            
            return res.status(200).json({
                success: true,
                data: members
            });
            
        } catch (error) {
            console.error('Error fetching members by department:', error);
            return res.status(500).json({
                success: false,
                message: 'Error fetching members by department',
                error: error.message
            });
        }
    }
    
    // Get core team
    static async getCoreTeam(req, res) {
        try {
            await connectDB();
            
            const coreTeam = await Member.getCoreTeam();
            
            return res.status(200).json({
                success: true,
                data: coreTeam
            });
            
        } catch (error) {
            console.error('Error fetching core team:', error);
            return res.status(500).json({
                success: false,
                message: 'Error fetching core team',
                error: error.message
            });
        }
    }
    
    // Update member permissions
    static async updateMemberPermissions(req, res) {
        try {
            await connectDB();
            
            const { id } = req.params;
            const { permissions } = req.body;
            
            const member = await Member.findByIdAndUpdate(
                id,
                { permissions },
                { new: true }
            );
            
            if (!member || !member.isActive) {
                return res.status(404).json({
                    success: false,
                    message: 'Member not found'
                });
            }
            
            return res.status(200).json({
                success: true,
                message: 'Member permissions updated successfully',
                data: member
            });
            
        } catch (error) {
            console.error('Error updating member permissions:', error);
            return res.status(500).json({
                success: false,
                message: 'Error updating member permissions',
                error: error.message
            });
        }
    }
    
    // Add review to member
    static async addReview(req, res) {
        try {
            await connectDB();
            
            const { id } = req.params;
            const { reviewer, rating, comment } = req.body;
            
            const member = await Member.findById(id);
            
            if (!member || !member.isActive) {
                return res.status(404).json({
                    success: false,
                    message: 'Member not found'
                });
            }
            
            member.performance.reviews.push({
                date: new Date(),
                reviewer,
                rating,
                comment
            });
            
            // Update overall rating (average of all reviews)
            const allRatings = member.performance.reviews.map(r => r.rating);
            member.performance.rating = allRatings.reduce((a, b) => a + b, 0) / allRatings.length;
            
            await member.save();
            
            return res.status(200).json({
                success: true,
                message: 'Review added successfully',
                data: member
            });
            
        } catch (error) {
            console.error('Error adding review:', error);
            return res.status(500).json({
                success: false,
                message: 'Error adding review',
                error: error.message
            });
        }
    }
    
    // Award badge to member
    static async awardBadge(req, res) {
        try {
            await connectDB();
            
            const { id } = req.params;
            const { name, description, icon } = req.body;
            
            const member = await Member.findById(id);
            
            if (!member || !member.isActive) {
                return res.status(404).json({
                    success: false,
                    message: 'Member not found'
                });
            }
            
            member.performance.badges.push({
                name,
                description,
                earnedDate: new Date(),
                icon
            });
            
            await member.save();
            
            return res.status(200).json({
                success: true,
                message: 'Badge awarded successfully',
                data: member
            });
            
        } catch (error) {
            console.error('Error awarding badge:', error);
            return res.status(500).json({
                success: false,
                message: 'Error awarding badge',
                error: error.message
            });
        }
    }
}
