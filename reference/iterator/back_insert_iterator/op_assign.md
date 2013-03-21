```cpp
back_insert_iterator<Container>&
  operator=(const typename Container::value_type& value);

// C++11から
back_insert_iterator<Container>&
  operator=(typename Container::value_type&& value);
```

##概要

<b>値を出力する</b>


##効果

const参照版`container->push_back(value);`
右辺値参照版container->push_back(std::move(value));

##戻り値

`*this`

##例

```cpp
```

###出力

```cpp
##参照
```
