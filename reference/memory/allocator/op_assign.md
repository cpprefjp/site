# operator=
* memory[meta header]
* std[meta namespace]
* allocator[meta class]
* function[meta id-type]

```cpp
allocator& operator=(const allocator&);                     // (1) C++03 (暗黙定義)
allocator& operator=(const allocator&) = default;           // (1) C++11
constexpr allocator& operator=(const allocator&) = default; // (1) C++20
```

## 概要
代入する。


## 戻り値
代入後の`*this`を返す。


## 参照
- [P0784R7 More constexpr containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0784r7.html)
