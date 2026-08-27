# operator=
* iterator[meta header]
* std[meta namespace]
* insert_iterator[meta class]
* function[meta id-type]

```cpp
insert_iterator&
  operator=(typename Container::const_reference value);   // (1) C++98
insert_iterator&
  operator=(const typename Container::value_type& value); // (1) C++11
constexpr insert_iterator&
  operator=(const typename Container::value_type& value); // (1) C++20

insert_iterator&
  operator=(typename Container::value_type&& value);      // (2) C++11
constexpr insert_iterator&
  operator=(typename Container::value_type&& value);      // (2) C++20
```

## 概要
値を出力する


## 効果
- (1) :
    ```cpp
    iter = container->insert(iter, value);
    ++iter;
    ```

- (2) :
    ```cpp
    iter = container->insert(iter, std::move(value));
    ++iter;
    ```


## 戻り値
`*this`


## 参照
- [P1032R1 Misc `constexpr` bits](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1032r1.html)
- [LWG Issue 1334. Insert iterators are broken for some proxy containers compared to C++03](https://cplusplus.github.io/LWG/issue1334)
    - C++11で、代入演算子の引数型が`Container::const_reference`から`const Container::value_type&`へ改められた。[`vector<bool>`](/reference/vector/vector.md)のようにプロキシ参照を持つコンテナでは、`const_reference`が参照型ではないため代入できなかった
