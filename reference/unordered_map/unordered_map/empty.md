# empty
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
bool empty() const noexcept;               // (1) C++11
[[nodiscard]] bool empty() const noexcept; // (1) C++20
constexpr bool empty() const noexcept;     // (1) C++26
```

## 概要
コンテナが空かどうかを判定する。


## 戻り値
コンテナが空であれば `true`、そうでなければ `false` を返す。


## 例外
投げない。


## 計算量
定数


## 例
```cpp example
#include <iostream>
#include <string>
#include <unordered_map>

int main()
{
  std::cout << std::boolalpha;

  std::unordered_map<std::string, int> um;

  // 空
  std::cout << um.empty() << std::endl;

  um.emplace("1st", 1);

  // 空ではない
  std::cout << um.empty() << std::endl;

  um.clear();

  // 空
  std::cout << um.empty() << std::endl;
}
```
* empty()[color ff0000]
* emplace[link emplace.md]
* clear[link clear.md]

### 出力
```
true
false
true
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

## 実装例
```cpp
template <class Key, class Hash, class Pred, class Allocator>
inline bool unordered_map<Key, Hash, Pred, Allocator>::empty() const noexcept {
  return [size](size)() == 0; // begin() == end() でも OK
}
```
* begin[link /reference/unordered_map/unordered_map/begin.md]
* end[link /reference/unordered_map/unordered_map/end.md]

## 関連項目

| 名前 | 説明 |
|-----------------------------|------------------------------|
| [`size`](size.md)         | 要素数の取得                 |
| [`max_size`](max_size.md) | 格納可能な最大の要素数の取得 |


## 参照
- [P0600R1 `[[nodiscard]]` in the Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0600r1.pdf)
    - C++20で`[[nodiscard]]`が付加された
- [P2422R1 Remove `nodiscard` annotations from the standard library specification](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2422r1.html)
    - C++26で`[[nodiscard]]`指定が削除された
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
