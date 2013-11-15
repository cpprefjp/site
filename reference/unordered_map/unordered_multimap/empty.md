#empty(C++11)
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
#include <string>
#include <unordered_map>

int main()
{
  std::cout << std::boolalpha;

  std::unordered_multimap<std::string, int> um;

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
* iostream[link /reference/iostream]
* string[link /reference/string.md]
* unordered_map[link /reference/unordered_map.md]
* unordered_multimap[link /reference/unordered_map/unordered_multimap.md]
* emplace[link emplace.md]
* clear[link clear.md]

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
- [Clang, C++11 mode](/implementation#clang.md): 3.0
- [GCC, C++11 mode](/implementation#gcc.md): 4.7.3
- [ICC](/implementation#icc.md): ?
- [Visual C++](/implementation#visual_cpp.md): ?

##実装例
```cpp
template <class Key, class Hash, class Pred, class Allocator>
inline bool unordered_multimap<Key, Hash, Pred, Allocator>::empty() const noexcept {
  return [size](size)() == 0; // begin() == end() でも OK
}
```
* begin[link ./begin.md]
* end[link ./end.md]

##参照

| 名前                        | 説明                         |
|-----------------------------|------------------------------|
| [`size`](./size.md)         | 要素数の取得                 |
| [`max_size`](./max_size.md) | 格納可能な最大の要素数の取得 |

