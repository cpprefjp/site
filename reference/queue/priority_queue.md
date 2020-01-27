# priority_queue
* queue[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class T,
            class Container = std::vector<T>,
            class Compare = less<typename Container::value_type>>
  class priority_queue;
}
```
* less[link /reference/functional/less.md]

## 概要
`priority_queue`はコンテナアダプタであり、優先順位付き�ューを実現する目的で�計されている。要素を`push()`で追加し、取り出す際に`top()`を呼び出すことで、`Compare`述語によって優先順に要素が取り出される。デフォルトでは降順に処理される。

`priority_queue`は、所定のメンバ関数を持つコンテナのオブジェクトを内部実装として用いており、標準のコンテナ、もしくは独自に実装したコンテナを指定することができる。

このコンテナに必要な要件は、ランダムアクセスイテレータを持ち、かつ以下のメンバ関数を持つことである。

- `front()`
- `push_back()`
- `pop_back()`
- `emplace_back()` (C++11)

この要件を満たすものとしては[`vector`](/reference/vector.md)と[`deque`](/reference/deque/deque.md)があり、デフォルトでは[`vector`](/reference/vector.md)が使用される。

`queue`は2つのテンプレート引数を持つ。

各テンプレートパラメータの意味は以下の通りである。

- `T`: 要素の型
- `Container`: 内部実装のコンテナクラス
- `Compare`: 優先順に並べ替えるための比較用述語型。デフォルトでは降順比較の[`less`](/reference/functional/less.md)が使用される。

以下のリファレンス�では、テンプレート引数として同じ名前を用いる。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------|------------------------------------------------|-------|
| [`(constructor)`](priority_queue/op_constructor.md) | コンストラクタ | |
| `~priority_queue() = default`            | デストラクタ | |
| `operator=(const priority_queue&) = default`<br/> `operator=(priority_queue&&) = default` | 代入演算� | |
| [`empty`](priority_queue/empty.md)     | 要素が空かどうかを判定する | |
| [`size`](priority_queue/size.md)       | 要素数を取得する | |
| [`top`](priority_queue/top.md)         | 次の要素にアクセスする | |
| [`push`](priority_queue/push.md)       | 要素を追加する | |
| [`emplace`](priority_queue/emplace.md) | 直接構築で要素を追加する | C++11 |
| [`pop`](priority_queue/pop.md)         | 次の要素を削除する | |
| [`swap`](priority_queue/swap.md)       | 他のpriority_queueオブジェクトと値を入れ替える | C++11 |


## protectedメンバ変数

| 変数名 | 型 | 対応バージョン |
|--------|-------------|-------|
| `c`    | `Container` | |
| `comp` | `Compare`   | |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|-------------------|------------------------------|-------|
| `value_type`      | `Container::value_type`      | |
| `reference`       | `Container::reference`       | C++11 |
| `const_reference` | `Container::const_reference` | C++11 |
| `size_type`       | `Container::size_type`       | |
| `container_type`  | `Container`                  | |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------|-----------------------------------------------|-------|
| [`swap`](priority_queue/swap_free.md) | 2つの`priority_queue`オブジェクトを入れ替える | C++11 |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------------|-------|
| [`(deduction_guide)`](priority_queue/op_deduction_guide.md) | クラステンプレートの推論補助 | C++17 |


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <queue>

int main()
{
  // intを要素に持つ優先順位付き�ュー。
  // 降順に処理する
  std::priority_queue<int> que;

  // データを追加する
  que.push(3);
  que.push(1);
  que.push(4);

  // 処理順に出力する
  while (!que.empty()) {
    std::cout << que.top() << std::endl;
    que.pop();
  }
}
```
* std::priority_queue[color ff0000]
* que.push[link priority_queue/push.md]
* que.empty()[link priority_queue/empty.md]
* que.top()[link priority_queue/top.md]
* que.pop()[link priority_queue/pop.md]

#### 出力
```
4
3
1
```


### 処理順をカスタマイズする (C++11)
```cpp example
#include <iostream>
#include <queue>

int main()
{
  // 昇順に処理する
  {
    std::priority_queue<
      int,                // 要素の型はint
      std::vector<int>,   // 内部コンテナはstd::vector (デフォルトのまま)
      std::greater<int>   // 昇順 (デフォルトはstd::less<T>)
    > que;

    que.push(3);
    que.push(1);
    que.push(4);

    while (!que.empty()) {
      std::cout << que.top() << std::endl;
      que.pop();
    }
  }
  std::cout << std::endl;

  // 処理順を表す比較関数オブジェクトにラムダ式を使用する
  {
    auto compare = [](int a, int b) {
      return a < b;
    };

    std::priority_queue<
      int,
      std::vector<int>,
      decltype(compare) // 比較関数オブジェクトを指定
    > que {compare};

    que.push(3);
    que.push(1);
    que.push(4);

    while (!que.empty()) {
      std::cout << que.top() << std::endl;
      que.pop();
    }
  }
}
```
* std::priority_queue[color ff0000]
* que.push[link priority_queue/push.md]
* que.empty()[link priority_queue/empty.md]
* que.top()[link priority_queue/top.md]
* que.pop()[link priority_queue/pop.md]
* std::greater[link /reference/functional/greater.md]
* std::less[link /reference/functional/less.md]

#### 出力
```
1
3
4

4
3
1
```


## 関連項目
- [`std::push_heap`](/reference/algorithm/push_heap.md)
- [`std::pop_heap`](/reference/algorithm/pop_heap.md)
- [`std::make_heap`](/reference/algorithm/make_heap.md)
- [`std::sort_heap`](/reference/algorithm/sort_heap.md)
