#pop
* queue[meta header]
* std[meta namespace]

```cpp
void pop();
```

##概要
`queue` の次の要素を削除して、要素数を１つ減らす。 
削除する要素は `queue` の最初にある要素で、`front()` メンバ関数で得られるものであり、そのデストラクタが呼ばれる。 
内部のコンテナの `pop_front()` メンバ関数を呼ぶ。


##戻り値
なし


##例
```cpp
#include <iostream>
#include <queue>

int main() {
  std::queue<int> q;

  q.push(10);
  q.push(20);
  q.push(30);

  q.pop(); // 10がpopされる
  q.pop(); // 20がpopされる
  std::cout << q.front() << std::endl;

  return 0;
}
```

###出力
```
30
```

##実装例
```cpp
void pop() { c.pop_front(); }
```

##参照

