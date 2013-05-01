#push
```cpp
void push(const value_type& x);

// C++11から
void push(value_type&& x);
```

##概要

<b>新たな要素を追加し、優先順に並べ替えを行う。</b>


##効果

const左辺値参照バージョン：

`c.push_back(x);``[push_heap](/reference/algorithm/push_heap.md)(c.begin(), c.end(), comp);`

右辺値参照バージョン：
`c.push_back([move](/reference/utility/move.md)(x));`<code style='color:rgb(0,0,0)'>[push_heap](/reference/algorithm/push_heap.md)(c.begin(), c.end(), comp);</code>

##戻り値

なし


##備考



##例

```cpp
#include <iostream>
#include <queue>

int main()
{
  std::priority_queue<int> que;

  que.push(3);
  que.push(1);
  que.push(4);

  while (!que.empty()) {
    const int& x = que.top();
    std::cout << x << std::endl;
    que.pop();
  }
}
```
* push[color ff0000]
* push[color ff0000]
* push[color ff0000]

###出力

```cpp
4
3
1
```

###右辺値参照バージョンの使用可能状況

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??



##参照


