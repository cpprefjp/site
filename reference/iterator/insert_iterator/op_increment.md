# operator++
* iterator[meta header]
* std[meta namespace]
* insert_iterator[meta class]
* function[meta id-type]

```cpp
insert_iterator& operator++();              // (1) C++03
constexpr insert_iterator& operator++();    // (1) C++20

insert_iterator& operator++(int);           // (2) C++03
constexpr insert_iterator& operator++(int); // (2) C++20
```

## 概要
イテレータをインクリメントする。

`insert_iterator`では何もしない。


## 戻り値
`*this`


## 参照
- [P1032R1 Misc `constexpr` bits](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1032r1.html)
