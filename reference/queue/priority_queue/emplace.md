#emplace
```cpp
template <class... Args>
void emplace(Args&&... args);
```

##概要

<b>要素型Tのコンストラクタ引数をとり、直接構築でpriority_queueに要素を追加する。</b>



##効果

`c.emplace_back([forward](/reference/utility/forward.md)<Args>(args)...);``[push_heap](/reference/algorithm/push_heap.md)(c.begin(), c.end(), comp);`



##戻り値

なし


##備考



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
* emplace[color ff0000]
* emplace[color ff0000]

###出力

```cpp
4, ccc
3, aaa
1, bbb
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++11 mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??



##参照


