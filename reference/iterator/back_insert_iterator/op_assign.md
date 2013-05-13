#代入演算子
```cpp
back_insert_iterator<Container>&
  operator=(const typename Container::value_type& value);

// C++11から
back_insert_iterator<Container>&
  operator=(typename Container::value_type&& value);
```

##概要
値を出力する


##効果
`const`参照版： `container->push_back(value);`
右辺値参照版： container->push_back(std::move(value));


##戻り値
`*this`

##例
```cpp
```

###出力
```
```

##参照
