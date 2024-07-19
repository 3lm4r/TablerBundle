# Collections in forms

There are some helpers for Forms. One of them is the SimpleCollection. It's strictly based on the Symfony CollectionType, the basic form type for 1-to-n ORM relations of entities in a FormType.

## Prerequirements

For full function from beginning this feeture need the ``stimulus`` package. If you don't want to use the predefined JS controllers, you have to do youre own JS work. The component ``stimulus`` is an JS Framework highly adobted from symfony at the moment. See ... for more informations.

In order install ``stimulus`` in your symfony project run the following command.

```bash
composer require symfony/stimulus-bundle
```

## Simple basic example

If you have an ``User`` entity witch can have multiple ``UserGroup`` membnerships, youe entities might look like the following examples.

```php
#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements UserInterface, ... {

    #[ORM\Column(length: ..., unique: true)]
    private ?string $username = null;

    #[ORM\ManyToMany(targetEntity: UserGroup::class, inversedBy: 'users')]
    #[ORM\JoinColumn(nullable: true, referencedColumnName: 'id')]
    #[ORM\InverseJoinColumn(name: 'group_id', referencedColumnName: 'id')]
    private Collection $groups;

    ...
}
```

Your ``UserGroup`` entity class might look something like the following.

```php
#[ORM\Entity(repositoryClass: UserGroupRepository::class)]
class UserGroup {
    ...

    #[ORM\Column(length: ..., unique: true, nullable: false)]
    private string $name;

    #[ORM\ManyToMany(targetEntity: User::class, mappedBy: 'groups')]
    private Collection $users;

    ...

    # Might be important, so the macro can render your relation as 'n string
    public function __toString ()
    {
        return $this->getName();
    }

    ...
}
```

In this simple n-to-n entity relation you can use the SimpleCollection twig macros in youre form of the User entity, to render the ``UserGroup`` relation of a single ``User``. Let me show you an example. Name the alias of the import as you want, in this case we call it ``collection``.

templates/user/_form.html.twig

```twig
{% import "@Tabler/forms/simple_collection.html.twig" as collection %}

{{ form_start(form) }}

    ...

    {{ form_row(form.username) }}

    {{ collection.simpleCollection(form.groups) }}

    ...

{{ form_end(form) }}
```

The result of this is something like shown in the following image.

![screen-gif](./SimpleCollection - Example.gif)
