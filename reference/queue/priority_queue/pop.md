#pop
* queue[meta header]
* std[meta namespace]

```cpp
void pop();
```

##概要
`priority_queue` の次の要素を削除して、要素数を１つ減らす。 
削除する要素は[`top()`](./top.md)メンバ関数で得られるオブジェクトであり、そのデストラクタが呼ばれる。 
内部のコンテナの`pop_back()`メンバ関数を呼ぶ。


##効果
[`pop_heap`](/reference/algorithm/pop_heap.md)`(c.begin(), c.end(), comp);` 
`c.pop_back();`


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

  que.pop(); // 4がpopされる
  que.pop(); // 3がpopされる
  std::cout << que.top() << std::endl;
}
```
* pop[color ff0000]

###出力
```
1
```

##参照


