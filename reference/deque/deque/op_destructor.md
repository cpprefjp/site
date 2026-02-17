# デストラクタ
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]

```cpp
~deque();           // (1) C++03
constexpr ~deque(); // (1) C++26
```

## 概要
`deque`が保持している全ての要素に対してデストラクタを実行し、メモリを解放する。


## 例外
投げない


## 計算量
線形時間


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
