#front
* queue[meta header]
* std[meta namespace]
* queue[meta class]
* function[meta id-type]

```cpp
value_type& front();
const value_type& front() const;
```

##概要
`queue` の次の要素への参照を返す。

これは一番初めに `queue` に挿入された要素で、`pop()` メンバ関数で削除される要素である。

内部のコンテナの `front()` メンバ関数を呼ぶ。


##戻り値
`queue` の最初の要素への参照。

`value_type` 型は内部のコンテナの値を表す型で、第1テンプレート引数の `T` と同じ型であるべきである。


##例
```cpp
#include <iostream>
#include <queue>

int main() {
  std::queue<int> que;

  // とりあえず3つ挿入
  que.push(10);
  que.push(20);
  que.push(30);

  // 1つ目を取り出し
  std::cout << que.front() << std::endl;
  que.pop();

  // 2つ目を取り出し
  std::cout << que.front() << std::endl;
  que.pop();

  return 0;
}
```
* front()[color ff0000]
* que.push[link push.md]
* que.pop()[link pop.md]

###出力
```
10
20
```

##実装例

```cpp
value_type& front() { return c.front(); }
const value_type& front() const { return c.front(); }
```

##参照

