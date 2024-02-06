# SWOZO

System for organizing and conducting online classes, created as a BEng project. Thesis (in Polish) is available in <a href="./engineering-thesis.pdf">engineering-thesis.pdf</a>. It contains project assumptions and requirements, project design and  documentation. UI samples are shown after page 84. For running instructions see <a href="./infra">infra directory</a>.

The main use case flow is illustrated below. The system enables technical teachers (ones that understand the software, e.g. those that can create ready-to-use Jupyter notebooks) to create and share them as activity modules. Other teachers are then able to use those modules in their own courses as they see fit (they can e.g. combine multiple notebooks with quizzes and videconferencing). Services are automatically run in the cloud at activity times selected by the teacher. Teachers and students receive links through which they can access those services from their browsers.

<p align="center">
<img style="width: 75%;" src="https://github.com/Fl0k3n/swozo/assets/69090648/6a7b3bc1-a24b-4ba3-9add-f5dc99acc894"/>
</p>

The system differs from other popular online class services (such as Moodle) by using third-party services instead of integrating them into the solution. Those third-party services can provide much more functionalities and better user flow as they are optimized for a single purpose. We support Jupyter Notebooks, Jitsi Meet (videoconferencing), QuizApp (quizzes), and Docker (which allows using arbitrary software, but requires more configuration on the teacher's part). We follow a VM per user model, each student receives their own VM with all chosen services (except for shared ones, like videoconferencing). VMs are managed through our Google Compute Engine integration.

System's architecture is depicted below:

<p align="center">
<img src="https://github.com/Fl0k3n/swozo/assets/69090648/207f39c2-ed28-4e72-b6f7-a23dcf22dbe1"/>
</p>

For more details, including the tech stack and explanation of design choices, refer to the thesis. Shortly, we use Spring, PostgreSQL and React.
