#emplace (C++11)
```cpp
template <class... Args>
void emplace(Args&&... args);
```

##概要
要素型`T`のコンストラクタ引数をとり、直接構築で`priority_queue`に要素を追加する。


##効果
`c.emplace_back(`[`forward`](/reference/utility/forward.md)`<Args>(args)...);` 
[`push_heap`](/reference/algorithm/push_heap.md)`(c.begin(), c.end(), comp);`


##戻り値
なし


##例
```cpp
#include <iostream>
#include <queue>
#include <string>
#include <utility> // std::pair

int main ()
{
  std::priority_queue<std::pair<int, std::string>> que;

  que.emplace(3, "aaa");
  que.emplace(1, "bbb");
  que.emplace(4, "ccc");

  while (!que.empty()) {
    std::cout << que.top().first << ", " << que.top().second << std::endl;
    que.pop();
  }
}
```
* emplace[color ff0000]

###出力
```
4, ccc
3, aaa
1, bbb
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??

##参照


