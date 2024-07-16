# operator==
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr bool operator==(const time_zone_link& x, const time_zone_link& y) noexcept; // (1) C++20
}
```

## 概要
`time_zone_link`同士の等値比較を行う。


## 戻り値
```cpp
return x.name() == y.name();
```
* name()[link name.md]


## 例外
投げない


## 備考
- この演算子により、`operator!=`が使用可能になる


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]

