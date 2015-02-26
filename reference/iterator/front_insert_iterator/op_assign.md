#operator=
* iterator[meta header]

```cpp
front_insert_iterator&
  operator=(const typename Container::value_type& value);

// C++11から
front_insert_iterator&
  operator=(typename Container::value_type&& value);
```

##概要
値を出力する


##効果
- `const`参照版：`container->push_front(value);`
- 右辺値参照版： `container->push_front(`[`std::move`](/reference/utility/move.md)`(value));`


##戻り値
`*this`



##例
```cpp
```

###出力
```
```

##参照
