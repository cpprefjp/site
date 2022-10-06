# デストラクタ
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
~basic_string();           // (1) C++03
constexpr ~basic_string(); // (1) C++20
```

## 概要
`basic_string`が保持している全ての要素に対してデストラクタを実行し、メモリを解放する。


## 例外
投げない


## 計算量
線形時間


## 参照
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
