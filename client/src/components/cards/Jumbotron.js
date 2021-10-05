import Typewriter from 'typewriter-effect';

const Jumbotron = ({ text }) => {
  return (
    <span
      level={2}
      style={{
        display: 'block',
        color: '#fa541c',
        padding: '80px 0',
        textAlign: 'center',
        backgroundColor: '#f0f5ff',
        fontSize: 60,
        fontWeight: 'bold',
        marginBottom: 16,
      }}
    >
      <Typewriter
        options={{
          strings: text,
          autoStart: true,
          loop: true,
        }}
      />
    </span>
  );
};

export default Jumbotron;
