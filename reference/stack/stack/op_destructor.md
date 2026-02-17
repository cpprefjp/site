# デストラクタ
* stack[meta header]
* std[meta namespace]
* stack[meta class]
* function[meta id-type]

```cpp
~stack();           // (1) C++03
constexpr ~stack(); // (1) C++26
```

## 概要
stack コンテナアダプタのオブジェクトを破棄する。


## 計算量
線形時間 O(n) (全要素のデストラクタ呼び出し)


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
