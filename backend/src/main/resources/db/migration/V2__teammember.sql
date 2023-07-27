create table teammember (
                            id uuid not null,
                            image varchar(255),
                            name varchar(255),
                            role varchar(255),
                            description varchar(1000),
                            primary key (id)
);

INSERT INTO teammember(id, image, name, role, description)
VALUES (
           'abbd65f8-d3dc-4e55-b5e7-c429da2a15a3',
           'Rafael.png',
           'Rafael',
           'Project Manager',
           'An accomplished leader adept at applying project management methodologies and best practices to drive the efficient and effective delivery of projects.'
       );

INSERT INTO teammember(id, image, name, role, description)
VALUES (
           'e159213f-4c5a-44b8-a909-64d28ba50f52',
           'Hyewon.jpeg',
           'Hyewon',
           'UI/UX Designer',
            'A creative visionary who weaves together artistry, empathy, and technical prowess to craft exceptional user experiences.'
       );

INSERT INTO teammember(id, image, name, role, description)
VALUES (
           'b1a55408-04e8-4db7-9d38-b57fd216ad56',
           'Kyle.jpeg',
           'Kyle',
           'AI Engineer',
           'A brilliant mind at the forefront of technological innovation, shaping the future with their expertise in artificial intelligence and machine learning.'
       );

INSERT INTO teammember(id, image, name, role, description)
VALUES (
           '4e9445d0-58d4-4f0a-a202-ccbd9c7f7c2d',
           'Joseph.jpeg',
           'Joseph',
           'Software Engineer',
            'A visionary architect who brings dreams to life through code with boundless creativity and problem-solving skills.'
       );

INSERT INTO teammember(id, image, name, role, description)
VALUES (
           'd307ec15-803b-49d5-ae27-98b98dc4b1f6',
           'Bella.jpeg',
           'Bella',
           'Software Engineer',
            'A digital alchemist, adept at transforming abstract ideas into tangible realities.'
       );