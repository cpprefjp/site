#pop
```cpp
void pop();
```

##概要

<b>priority_queue の次の要素を削除して、要素数を１つ減らす。
削除する要素は[top()](/reference/queue/priority_queue/top.md)メンバ関数で得られるオブジェクトであり、そのデストラクタが呼ばれる。
内部のコンテナのpop_back()メンバ関数を呼ぶ。
</b>


##効果

`[pop_heap](/reference/algorithm/pop_heap.md)(c.begin(), c.end(), comp);``c.pop_back();`



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

  que.pop(); // 4がpopされる
  que.pop(); // 3がpopされる
  std::cout << que.top() << std::endl;
}
```
* pop[color ff0000]
* pop[color ff0000]

###出力

```cpp
1
```

##参照


