#push
* queue[meta header]

```cpp
void push(const value_type& x);

// C++11から
void push(value_type&& x);
```

##概要
新たな要素を追加し、優先順に並べ替えを行う。


##効果
`const`左辺値参照バージョン： 
`c.push_back(x);` 
[`push_heap`](/reference/algorithm/push_heap.md)`(c.begin(), c.end(), comp);` 

右辺値参照バージョン： 
`c.push_back(`[`move`](/reference/utility/move.md)`(x));`
[`push_heap`](/reference/algorithm/push_heap.md)`(c.begin(), c.end(), comp);`


##戻り値
なし


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

###出力
```
4
3
1
```

###右辺値参照バージョンの使用可能状況
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


