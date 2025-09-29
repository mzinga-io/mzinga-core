<p align="left">
  <a href="https://github.com/mzinga-io/mzinga-core/actions"><img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/mzinga-io/mzinga-core/main.yml?style=flat-square"></a>
</p>


<h3>The Story: Why We Forked PayloadCMS v2</h3>
<ul>
<li>Our journey began with a deep appreciation for PayloadCMS. The team at Newesis embraced PayloadCMS from its early days, recognizing its powerful architecture and contributing as individual developers to the open-source project. Mzinga was initially born as a suite of extensions on top of PayloadCMS version 2, adding new capabilities to an already excellent core.</li>
<li>When PayloadCMS evolved to version 3, it introduced significant architectural changes. After careful consideration, we decided that the v2 architecture remained the ideal foundation for our vision of a highly extensible, event-driven data platform.</li>
<li>With PayloadCMS v2 no longer actively maintained, we were at a crossroads. To ensure the long-term stability and evolution of the platform our clients and projects relied on, we made a crucial decision: we forked the latest release of PayloadCMS v2.</li>
<li>This fork is now Mzinga Core. By taking ownership of the core, we guarantee its maintenance and evolution, allowing us to innovate while preserving the architectural principles we value. The entire Mzinga.io ecosystem—Mzinga Core, Mzinga Apps, and Mzinga Tools, is now fully open source under the new mzinga-io organization on GitHub. This is our commitment to the community and to the future of this powerful platform.</li>
</ul>


## The Core Concept: Dynamic, API-First Data Modeling

The true power of Mzinga lies in its dynamic nature. You are not limited by a predefined schema. Instead, you can create entirely new classes of entities, or "Collections", at runtime.

The process is simple and powerful:
<ul>
<li>Define: You design your entity structure as a JSON object, defining fields, types, and relationships.</li>
<li>POST: You post this JSON definition to Mzinga's Custom Entities API.</li>
<li>Publish: Once the entity is published, Mzinga’s engine automatically goes to work.<li>
</ul>
Instantly, the platform provisions a complete set of APIs for your new entity, with no code generation or server restarts required. You get:
<ul>
<li>REST APIs: A full suite of CRUD (Create, Read, Update, Delete) endpoints.</li>
<li>GraphQL APIs: Powerful and flexible query capabilities, automatically reflecting your schema.</li>
<li>WebSockets: Real-time data publication for any operation, enabling reactive frontend applications.</li>
</ul>


<a target="_blank" href="https://github.com/mzinga-io/mzinga-core/discussions"><strong>Request Feature</strong></a>


## 🗒️ Documentation

Check out the [Doc Directory](./docs) of the repo to find in-depth documentation for everything that the core solution offers.


## 🙋 Contributing

If you want to add contributions to this repository, please follow the instructions in [contributing.md](./CONTRIBUTING.md).

## 📚 Examples

The [Examples Directory](./examples) is a great resource for learning how to setup Mzinga-Core in a variety of different ways, but we encourage you to test the Mzinga-Apps repo, containing the extension to the Core platform. 
You can find the source code but also the Helm Chart to deploy the application in Kubernetes using the official images built by Newesis Srl. 

If you'd like to run the examples, you can either copy them to a folder outside this repo or run them directly by (1) navigating to the example's subfolder (`cd examples/your-example-folder`) and (2) using the `--ignore-workspace` flag to bypass workspace restrictions (e.g., `pnpm --ignore-workspace install` or `pnpm --ignore-workspace dev`).

You can see more examples at:

- [Examples Directory](./examples)

## 🚨 Need help?

You can open a new conversations in our Github Discussions board or create a new Issue if you identify a problem.

- [GitHub Discussions](https://github.com/mzinga-io/mzinga-core/discussions)
- [GitHub Issues](https://github.com/mzinga-io/mzinga-core/issues)


## ⭐ Like what we're doing? Give us a star

## 👏 Thanks to all our contributors

<img align="left" src="https://contributors-img.web.app/image?repo=mzinga-io/mzinga-core"/>
