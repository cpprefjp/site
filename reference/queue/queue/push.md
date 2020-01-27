# push
* queue[meta header]
* std[meta namespace]
* queue[meta class]
* function[meta id-type]

```cpp
void push(const value_type& x); // (1)
void push(value_type&& x);      // (2) C++11から
```

## 概要
新しい要素を`queue`の末尾に追加し、そのインスタンスを`x`のコピー、もしくはムーブして初期化する。


## 引数
`x`: 新しい要素としてコピー、もしくはムーブする値。


## 効果
- (1) : `c.push_back(x)`
- (2) : `c.push_back(std::`[`move`](/reference/utility/move.md)`(x))`


## 戻り値
なし


## 例
```cpp example
#include <iostream>
#include <queue>

int main()
{
  std::queue<int> que;

  // 値を追加する
  que.push(10);
  que.push(20);
  que.push(30);

  // �身の出力
  while(!que.empty()) {
    std::cout << que.front() << std::endl;
    que.pop();
  }
}
```
* push[color ff0000]
* que.empty()[link empty.md]
* que.front()[link front.md]
* que.pop()[link pop.md]

### 出力
```
10
20
30
```

## 参照

