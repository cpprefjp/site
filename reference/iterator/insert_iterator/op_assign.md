#代入演算子
```cpp
insert_iterator<Container>&
  operator=(const typename Container::value_type& value);

insert_iterator<Container>&
  operator=(typename Container::value_type&& value);
```

##概要
値を出力する


##効果
`const`参照版：
`iter = container->insert(iter, value);`
`++iter;`

右辺値参照版：
`iter = container->insert(iter, std::move(value));`
`++iter;`


##戻り値
`*this`


##例
```cpp
```

###出力
```
```

##参照
