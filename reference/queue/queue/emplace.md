#emplace
* queue[meta header]
* std[meta namespace]
* queue[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
template <class... Args>
void emplace(Args&&... args)
```

##概要
要素型`T`のコンストラクタ引数をとり、直接構築でキューに要素を追加する。


##効果
```cpp
c.emplace_back(std::forward<Args>(args)...);
```
* std::forward[link /reference/utility/forward.md]


##戻り値
なし


##例
```cpp
#include <iostream>
#include <queue>
#include <string>
#include <utility>

int main ()
{
  std::queue<std::pair<int, std::string>> que;

  que.emplace(3, "aaa");
  que.emplace(1, "bbb");
  que.emplace(4, "ccc");

  while (!que.empty()) {
    std::cout << que.front().first << ", " << que.front().second << std::endl;
    que.pop();
  }
}
```
* emplace[color ff0000]
* que.empty()[link empty.md]
* que.front()[link front.md]
* que.pop()[link pop.md]

###出力
```
3, aaa
1, bbb
4, ccc
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp)


##参照
- [N2680 Proposed Wording for Placement Insert (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2680.pdf)

