#clear(C++11)
```cpp
void clear() noexcept;
```

##概要
コンテナ内のすべての要素を削除する。


##要件
なし。


##効果
コンテナ内のすべての要素を削除する。


##事後条件
[`empty`](./empty.md)`() == true`


##戻り値
なし。


##例外
投げない。


##計算量
線形


##例
```cpp
#include <iostream>
#include <unordered_set>

int main()
{
  std::unordered_set<int> us{ 1, 2, 3, 4, 5, };

  std::cout << std::boolalpha;
  std::cout << us.empty() << std::endl;
  us.clear();
  std::cout << us.empty() << std::endl;
}
```
* iostream[link /reference/iostream.md]
* unordered_set[link /reference/unordered_set.md]
* empty[link ./empty.md]

###出力
```
false
true
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): -
- [Clang, C++0x mode](/implementation#clang.md): 3.1
- [GCC](/implementation#gcc.md): -
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ?
- [Visual C++](/implementation#visual_cpp.md): ?

##参照

| | |
|-------------------------------------|----------------------------|
| [`empty`](./empty.md)               | コンテナが空かどうかを判定 |
| [`emplace`](./emplace.md)           | コンテナ内への要素の直接構築 |
| [`emplace_hint`](./emplace_hint.md) | 挿入位置のヒントを使用したコンテナ内への要素の直接構築 |
| [`insert`](./insert.md)             | 要素の追加 |
| [`erase`](./erase.md)               | 要素の削除 |
| [`swap`](./swap.md)                 | 内容の交換 |

