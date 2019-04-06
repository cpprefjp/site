# operator*
* iterator[meta header]
* std[meta namespace]
* insert_iterator[meta class]
* function[meta id-type]

```cpp
insert_iterator& operator*();           // (1) C++03
constexpr insert_iterator& operator*(); // (1) C++20
```

## 概要
イテレータを間接参照する。


## 戻り値
`*this`


## 備考
間接参照で返された型への代入で出力する必要があるので、この関数は自身を返す。


## 参照
- [P1032R1 Misc `constexpr` bits](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1032r1.html)
