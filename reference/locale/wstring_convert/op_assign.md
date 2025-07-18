# operator=
* locale[meta header]
* std[meta namespace]
* wstring_convert[meta class]
* function[meta id-type]
* cpp11[meta cpp]
* cpp17deprecated[meta cpp]
* cpp26removed[meta cpp]

```cpp
wstring_convert& operator=(const wstring_convert&) = default; // C++11
wstring_convert& operator=(const wstring_convert&) = delete;  // C++14
```

このクラスはC++17から非推奨となり、C++26で削除された。

## 概要
コピー代入演算子。

コピー代入不可。これによってムーブ代入も不可。


## 参照
- [LWG Issue 2176. Special members for `wstring_convert` and `wbuffer_convert`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2176)
- [P2872R3 Remove `wstring_convert` From C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2872r3.pdf)
