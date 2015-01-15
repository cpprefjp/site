#empty (C++11)
```cpp
bool empty() const noexcept;
```

##概要
コンテナが空かどうかを判定する。


##戻り値
コンテナが空であれば `true`、そうでなければ `false` を返す。


##例外
投げない。


##計算量
定数


##例
```cpp
#include <iostream>
#include <unordered_set>

int main()
{
  std::cout << std::boolalpha;

  std::unordered_multiset<int> um;

  // 空
  std::cout << um.empty() << std::endl;

  um.insert(1);

  // 空ではない
  std::cout << um.empty() << std::endl;

  um.clear();

  // 空
  std::cout << um.empty() << std::endl;
}
```
* iostream[link /reference/iostream.md]
* unordered_set[link /reference/unordered_set.md]
* unordered_multiset[link /reference/unordered_set/unordered_multiset.md]
* insert[link /reference/unordered_set/unordered_multiset/insert.md]
* clear[link /reference/unordered_set/unordered_multiset/clear.md]

###出力
```
true
false
true
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++0x mode](/implementation.md#clang): 3.0, 3.1
- [GCC](/implementation.md#gcc): -
- [GCC, C++0x mode](/implementation.md#gcc): 4.4.7, 4.5.3, 4.6.3, 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

##実装例
```cpp
template <class Key, class Hash, class Pred, class Allocator>
inline bool unordered_multiset<Key, Hash, Pred, Allocator>::empty() const noexcept {
  return size() == 0; // begin() == end() でも OK
}
```
* size[link /reference/unordered_set/unordered_multiset/size.md]
* begin[link /reference/unordered_set/unordered_multiset/begin.md]
* end[link /reference/unordered_set/unordered_multiset/end.md]

##参照

| | |
|-----------------------------|------------------------------|
| [`size`](./size.md)         | 要素数の取得                 |
| [`max_size`](./max_size.md) | 格納可能な最大の要素数の取得 |

