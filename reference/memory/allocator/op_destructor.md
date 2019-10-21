# デストラクタ
* memory[meta header]
* std[meta namespace]
* allocator[meta class]
* function[meta id-type]

```cpp
~allocator() throw();       // C++03 まで
~allocator();               // C++11 から C++17 まで
constexpr ~allocator();     // C++20 から
```

## 概要
`allocator`オブジェクトを破棄する。


## 例外
投げない。


## 参照
- [P0784R7 More constexpr containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0784r7.html)
