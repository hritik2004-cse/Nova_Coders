# Updated EmailJS Template with Dynamic Variables

Copy this updated template to your EmailJS dashboard (template_m185am7):

## Template Settings:

**To field:** `{{user_email}}`

**From field:** `Nova Coders <novacoders.team@gmail.com>`

**Subject field:** `{{subject}}`

## Template Body:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Nova Coders!</title>
    <style>
        /* Base Styles - Light Mode */
        body {
            margin: 0;
            padding: 0;
            background-color: hsl(213 100% 97%); /* --bg */
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: hsl(213 100% 100%); /* --bg-light */
            color: hsl(230 100% 9%); /* --text */
        }
        .content {
            padding: 32px;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .logo-img {
            height: 80px;
            width: auto;
            border: 0;
        }
        .heading {
            font-size: 28px;
            font-weight: bold;
            margin-top: 24px;
            margin-bottom: 16px;
            /* NEW Light Mode Gradient Text */
            background: linear-gradient(to right, hsl(213, 85%, 35%), hsl(212, 64%, 30%));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
        .paragraph {
            font-size: 16px;
            line-height: 1.6;
            margin: 0 0 16px;
        }
        .message-content {
            font-size: 16px;
            line-height: 1.6;
            margin: 20px 0;
            white-space: pre-line;
            background-color: hsl(213 100% 99%);
            padding: 20px;
            border-left: 4px solid hsl(213, 85%, 35%);
            border-radius: 8px;
        }
        .cta-button {
            display: inline-block;
            text-decoration: none;
            color: #ffffff !important;
            padding: 14px 28px;
            border-radius: 9999px;
            font-weight: bold;
            /* NEW Light Mode Button Gradient */
            background: linear-gradient(to right, hsl(213, 85%, 35%), hsl(212, 64%, 30%));
        }
        .footer {
            margin-top: 32px;
            text-align: center;
            font-size: 12px;
            color: hsl(212 64% 45%); /* --text-muted */
        }

        /* Dark Mode Styles */
        @media (prefers-color-scheme: dark) {
            body {
                background-color: hsl(230 100% 4%) !important; /* --bg-dark */
            }
            .container {
                background-color: hsl(213 81% 10%) !important; /* --bg-light */
                color: hsl(213 78% 73%) !important; /* --text-muted */
            }
            .message-content {
                background-color: hsl(213 81% 8%) !important;
                border-left-color: hsl(213, 78%, 73%) !important;
            }
            .heading {
                /* NEW Dark Mode Gradient Text */
                background: linear-gradient(to right, hsl(213, 78%, 73%), hsl(35, 59%, 62%)) !important;
                -webkit-background-clip: text !important;
                background-clip: text !important;
                color: transparent !important;
            }
            .cta-button {
                 /* NEW Dark Mode Button Gradient */
                 background: linear-gradient(to right, hsl(213, 78%, 73%), hsl(35, 59%, 62%)) !important;
                 color: hsl(230 100% 4%) !important;
            }
            .footer {
                color: hsl(213 78% 73%) !important; /* --text-muted */
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <div class="header">
                <a style="text-decoration: none; outline: none" href="https://novacoders.dev" target="_blank">
                    <!-- You can add your logo URL here or remove this section -->
                    <h2 style="margin: 0; color: hsl(213, 85%, 35%); font-size: 24px;">Nova Coders</h2>
                </a>
            </div>

            <h1 class="heading" style="text-align: center;">Welcome {{user_name}}! 🚀</h1>

            <p class="paragraph">
                Hi {{user_name}},
            </p>

            <p class="paragraph">
                Thanks for subscribing to the Nova Coders newsletter! We're thrilled to have you with us.
            </p>

            <!-- Dynamic message content from the form -->
            <div class="message-content">
                {{message}}
            </div>

            <p style="text-align: center; margin-top: 32px; margin-bottom: 32px;">
                <a class="cta-button" href="https://chat.whatsapp.com/JVzL8OjwWlj2AsF99uXGs4?mode=ems_share_t" target="_blank">
                    Explore the Community
                </a>
            </p>

            <p class="paragraph">
                If you have any questions, feel free to join the conversation on our social channels. We're excited to see what you'll create!
            </p>

            <p class="paragraph">
                Best regards,<br />
                {{from_name}}
            </p>

            <div class="footer">
                <p>You received this email at {{user_email}} because you subscribed to our newsletter.</p>
                <p><a href="#" style="color: inherit; text-decoration: underline;">Unsubscribe</a></p>
                <p>&copy; 2025 Nova Coders. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>
```

## Key Changes Made:

### 1. **Added Dynamic Variables:**
- `{{user_name}}` - Shows the subscriber's name
- `{{user_email}}` - Shows the subscriber's email
- `{{message}}` - Shows the full welcome message
- `{{from_name}}` - Shows "Nova Coders"
- `{{subject}}` - Dynamic subject line

### 2. **Enhanced Message Section:**
- Added a styled box for the dynamic `{{message}}` content
- Preserves line breaks with `white-space: pre-line`
- Styled to match your design theme

### 3. **Personalization:**
- Header now says "Welcome {{user_name}}! 🚀"
- Greeting starts with "Hi {{user_name}},"
- Footer shows the actual email address

### 4. **Template Fields to Set in EmailJS Dashboard:**

**To:** `{{user_email}}`
**From:** `Nova Coders <novacoders.team@gmail.com>`
**Subject:** `{{subject}}`

## 🔧 **How to Update Your Template:**

1. **Go to:** https://dashboard.emailjs.com/
2. **Login** and go to "Email Templates"
3. **Find:** `template_m185am7`
4. **Click:** "Edit"
5. **Update the "To" field:** `{{user_email}}`
6. **Update the "Subject" field:** `{{subject}}`
7. **Replace the HTML body** with the code above
8. **Save** and make sure it's "Published"

## 🧪 **Test After Update:**

After updating your template, test it at:
`http://localhost:3000/emailjs-test`

You should now receive personalized emails with your name and the full welcome message! 🎉
