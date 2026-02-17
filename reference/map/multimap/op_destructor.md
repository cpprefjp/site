# デストラクタ
* map[meta header]
* std[meta namespace]
* multimap[meta class]
* function[meta id-type]

```cpp
~multimap();           // (1) C++03
constexpr ~multimap(); // (1) C++26
```

## 概要
コンテナオブジェクトを破棄する。これは格納された要素のデストラクタを呼び出し、`multimap` によって確保された全てのアロケート済みストレージを解放する。


## 計算量
[`size()`](size.md) に対して線形時間（デストラクタ呼び出し）


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
