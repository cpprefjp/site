#queue

| |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|<br/><br/><br/>```cpp
<br/>namespace std {<br/><br/>  template <class T, class Container = deque<T>><br/><br/>  class queue;<br/><br/>}<br/><br/><br/><br/><br/><br/> |
```
* deque[link /reference/deque.md]

##概要

queue はコンテナアダプタであり、FIFO (first-in first-out) の動作――コンテナの一方から要素が挿入され、反対側から要素を取り出す――を実現する目的で設計されている。要素をコンテナの back() 側から挿入し、front() 側から取り出す。


queue は、所定のメンバ関数を持つコンテナのオブジェクトを内部実装として用いており、標準のコンテナ、もしくは独自に実装したコンテナを指定することができる。

このコンテナに必要な要件は、以下のメンバ関数を持つことである。


- front()

- back()

- push_back()

- pop_front()

- emplace_back() (C++11)

この要件を満たすものとしては [deque](/reference/deque.md) と [list](/reference/list.md) があり、デフォルトでは[deque](/reference/deque.md)が使用される。



queueは2つのテンプレート引数を持つ。


各テンプレートパラメータの意味は以下の通りである。

<ol>
- T: 要素の型

- Container: 内部実装のコンテナクラス
</ol>




以下のリファレンス中では、テンプレート引数として同じ名前を用いる。



###メンバ関数



| | |
|-------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------|
| [`(constructor)`](./queue/queue.md) | コンストラクタ |
| [`empty`](./queue/empty.md) | 要素が空であるかを確認する |
| [`size`](./queue/size.md) | 要素数を取得する |
| [`front`](./queue/front.md) | 次の要素にアクセスする |
| [`back`](./queue/back.md) | 最後の要素にアクセスする |
| [`push`](./queue/push.md) | 要素を追加する |
| [`emplace`](./queue/emplace.md) | 直接構築で要素を追加する(C++11) |
| [`pop`](./queue/pop.md) | 次の要素を削除する |
| [`swap`](./queue/swap.md) | 他のqueueオブジェクトと値を入れ替える(C++11) |



###protectedメンバ変数


| | |
|------------------------|------------------------|
| `変数名` | `型` |
| `c` | `Container` |



###メンバ型





| | |
|------------------------------|-----------------------------------------|
| `value_type` | `Container::value_type` |
| `reference` | `Container::reference` |
| `const_reference` | `Container::const_reference` |
| `size_type` | `Container::size_type` |
| `container_type` | `Container` |


<h3>

<h3>


###非メンバ関数




| | |
|------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------|
| [`operator==`](./queue/equal.md) | 等値比較 |
| [`operator!=`](./queue/not_equal.md) | 非等値比較 |
| [`operator<`](./queue/less.md) | 左辺が右辺より小さいかの判定を行う |
| [`operator<=`](./queue/less_equal.md) | 左辺が右辺以下かの判定を行う |
| [`operator>`](./queue/greater.md) | 左辺が右辺より大きいかの判定を行う |
| [`operator>=`](./queue/greater_equal.md) | 左辺が右辺以上かの判定を行う |
| [`swap`](./queue/swap_free.md) | 2つのqueueオブジェクトを入れ替える(C++11) |


</h3>

</h3>


##例
```cpp
#include <iostream>
#include <queue>

int main ()
{
  std::queue<int> que;

  // 要素を追加
  que.push(1);
  que.push(2);
  que.push(3);

  while (!que.empty()) {
    std::cout << que.front() << " "; // 先頭要素を参照する
    que.pop(); // 先頭要素を削除
  }
}
```

###出力

```cpp
1 2 3 
```

###参照


