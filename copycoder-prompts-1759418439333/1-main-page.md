Convert the below HTML/CSS code into React components:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MCP Market - Leaderboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <!-- Logo -->
                <div class="flex items-center">
                    <div class="flex-shrink-0 flex items-center">
                        <div class="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center mr-3">
                            <span class="text-white text-sm font-bold">MCP</span>
                        </div>
                        <span class="text-xl font-bold text-gray-900">MCP Market</span>
                    </div>
                </div>

                <!-- Navigation -->
                <nav class="hidden md:flex space-x-8">
                    <a href="#" class="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Home</a>
                    <a href="#" class="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Browse All</a>
                    <a href="#" class="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Categories</a>
                    <a href="#" class="text-gray-900 px-3 py-2 text-sm font-medium">Leaderboard</a>
                </nav>

                <!-- Right side buttons -->
                <div class="flex items-center space-x-4">
                    <button class="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Submit MCP</button>
                    <button class="bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium flex items-center">
                        <i data-lucide="zap" class="w-4 h-4 mr-2"></i>
                        Power Your Agents
                    </button>
                    <button class="p-2 text-gray-500 hover:text-gray-900">
                        <i data-lucide="globe" class="w-5 h-5"></i>
                    </button>
                    <button class="p-2 text-gray-500 hover:text-gray-900">
                        <i data-lucide="sun" class="w-5 h-5"></i>
                    </button>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Breadcrumb -->
        <nav class="flex items-center space-x-2 text-sm text-gray-500 mb-8">
            <i data-lucide="home" class="w-4 h-4"></i>
            <span>Home</span>
            <i data-lucide="chevron-right" class="w-4 h-4"></i>
            <span class="text-gray-900">Leaderboard</span>
        </nav>

        <!-- Page Header -->
        <div class="mb-12">
            <div class="flex items-center mb-4">
                <i data-lucide="trophy" class="w-8 h-8 text-yellow-500 mr-3"></i>
                <h1 class="text-4xl font-bold text-gray-900">Top 100 MCP Servers</h1>
            </div>
            <div class="w-24 h-1 bg-yellow-400 mb-4"></div>
            <p class="text-lg text-gray-600 max-w-3xl">
                Explore the most popular MCP servers ranked by GitHub stars. Find the best open-source tools to connect AI to your favorite services.
            </p>
        </div>

        <!-- Leaderboard Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Rank 1 - MindsDB -->
            <div class="bg-white rounded-lg border border-gray-200 p-6 relative">
                <div class="absolute -top-3 -left-3 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                <div class="flex items-center mb-4">
                    <div class="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mr-4">
                        <span class="text-white font-bold">M</span>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl font-semibold text-gray-900">MindsDB</h3>
                        <div class="flex items-center text-gray-600">
                            <i data-lucide="star" class="w-4 h-4 text-yellow-500 mr-1"></i>
                            <span>36,230</span>
                        </div>
                    </div>
                </div>
                <p class="text-gray-600 mb-4">Build AI applications that can learn and answer questions over large-scale federated...</p>
                <span class="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Database Management</span>
            </div>

            <!-- Rank 2 - Context7 -->
            <div class="bg-white rounded-lg border border-gray-200 p-6 relative">
                <div class="absolute -top-3 -left-3 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                <div class="flex items-center mb-4">
                    <div class="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                        <span class="text-white font-bold">C</span>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl font-semibold text-gray-900">Context7</h3>
                        <div class="flex items-center text-gray-600">
                            <i data-lucide="star" class="w-4 h-4 text-yellow-500 mr-1"></i>
                            <span>32,268</span>
                        </div>
                    </div>
                </div>
                <p class="text-gray-600 mb-4">Fetches up-to-date documentation and code examples for LLMs and AI code editors...</p>
                <span class="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Learning & Documentation</span>
            </div>

            <!-- Rank 3 - GPT Researcher -->
            <div class="bg-white rounded-lg border border-gray-200 p-6 relative">
                <div class="absolute -top-3 -left-3 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                <div class="flex items-center mb-4">
                    <div class="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center mr-4 overflow-hidden">
                        <img src="/api/placeholder/48/48" alt="GPT Researcher" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl font-semibold text-gray-900">GPT Researcher</h3>
                        <div class="flex items-center text-gray-600">
                            <i data-lucide="star" class="w-4 h-4 text-yellow-500 mr-1"></i>
                            <span>23,680</span>
                        </div>
                    </div>
                </div>
                <p class="text-gray-600 mb-4">Conducts in-depth web and local research on any topic, generating comprehensive...</p>
                <span class="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Data Science & ML</span>
            </div>

            <!-- Rank 4 - GitHub -->
            <div class="bg-white rounded-lg border border-gray-200 p-6 relative">
                <div class="absolute -top-3 -left-3 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                <div class="flex items-center mb-4">
                    <div class="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mr-4">
                        <i data-lucide="github" class="w-6 h-6 text-white"></i>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl font-semibold text-gray-900">GitHub</h3>
                        <div class="flex items-center text-gray-600">
                            <i data-lucide="star" class="w-4 h-4 text-yellow-500 mr-1"></i>
                            <span>23,192</span>
                        </div>
                    </div>
                </div>
                <p class="text-gray-600 mb-4">Enables advanced automation and interaction capabilities with GitHub APIs for developers...</p>
            </div>

            <!-- Rank 5 - Task Master -->
            <div class="bg-white rounded-lg border border-gray-200 p-6 relative">
                <div class="absolute -top-3 -left-3 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-sm">5</div>
                <div class="flex items-center mb-4">
                    <div class="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center mr-4 overflow-hidden">
                        <img src="/api/placeholder/48/48" alt="Task Master" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl font-semibold text-gray-900">Task Master</h3>
                        <div class="flex items-center text-gray-600">
                            <i data-lucide="star" class="w-4 h-4 text-yellow-500 mr-1"></i>
                            <span>22,473</span>
                        </div>
                    </div>
                </div>
                <p class="text-gray-600 mb-4">Streamline AI-driven development workflows by automating task management with Claude.</p>
            </div>

            <!-- Rank 6 - Playwright -->
            <div class="bg-white rounded-lg border border-gray-200 p-6 relative">
                <div class="absolute -top-3 -left-3 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-sm">6</div>
                <div class="flex items-center mb-4">
                    <div class="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center mr-4">
                        <div class="grid grid-cols-2 gap-0.5 w-6 h-6">
                            <div class="bg-red-500 w-2.5 h-2.5"></div>
                            <div class="bg-green-500 w-2.5 h-2.5"></div>
                            <div class="bg-blue-500 w-2.5 h-2.5"></div>
                            <div class="bg-yellow-500 w-2.5 h-2.5"></div>
                        </div>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl font-semibold text-gray-900">Playwright</h3>
                        <div class="flex items-center text-gray-600">
                            <i data-lucide="star" class="w-4 h-4 text-yellow-500 mr-1"></i>
                            <span>21,074</span>
                        </div>
                    </div>
                </div>
                <p class="text-gray-600 mb-4">Automates browser interactions for Large Language Models (LLMs) using Playwright.</p>
            </div>
        </div>
    </main>

    <script>
        lucide.createIcons();
    </script>
</body>
</html>
```