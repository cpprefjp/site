# stack
* stack[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class T, class Container = deque<T>>
  class stack;
}
```
* deque[link /reference/deque.md]

## 概要
`stack` はコンテナアダプタであり、LIFO (last-in first-out) の動作――コンテナの一方から要素が挿入され、挿入された側から要素を取り出す――を実現する目的で設計されている。要素をコンテナの `back()` 側から挿入し、同じく `back()` 側から取り出す。

`stack` は、所定のメンバ関数を持つコンテナのオブジェクトを内部実装として用いており、標準のコンテナ、もしくは独自に実装したコンテナを指定することができる。
このコンテナに必要な要件は、以下のメンバ関数を持つことである。

- `back()`
- `push_back()`
- `pop_back()`
- `emplace_back()` (C++11)

この要件を満たすものとしては [`vector`](/reference/vector.md) 、[`deque`](/reference/deque.md) 、[`list`](/reference/list.md) があり、デフォルトでは [`deque`](/reference/deque.md) が使用される。

`stack` は2つのテンプレートパラメータを持つ。各テンプレートパラメータの意味は以下の通りである。

- `T`: 格納される要素の型
- `Container`: 要素へのアクセス・保存に用いる内部実装のコンテナクラス


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------------------------|----------------------------|-------|
| [`(constructor)`](stack/op_constructor.md)  | コンストラクタ             | |
| [`(destructor)`](stack/op_destructor.md)  | デストラクタ               | |
| [`operator=`](stack/op_assign.md)  | 代入                       | |
| [`top`](stack/top.md)              | 次の要素へアクセスする     | |
| [`empty`](stack/empty.md)          | 要素が空であるかを確認する | |
| [`size`](stack/size.md)            | 要素数を取得する           | |
| [`push`](stack/push.md)            | 要素を追加する             | |
| [`emplace`](stack/emplace.md)      | 直接構築で要素を追加する   | C++11 |
| [`pop`](stack/pop.md)              | 次の要素を削除する         | |
| [`swap`](stack/swap.md)            | 他の `stack` オブジェクトと値を入れ替える | C++11 |


## protectedメンバ変数

| 変数名 | 型 | 対応バージョン |
|--------|-------------|-------|
| `c`    | `Container` | |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|-------------------|---------------------|-------|
| `container_type`  | `Container` | |
| `value_type`      | `Container::value_type` | |
| `size_type`       | `Container::size_type` | |
| `reference`       | `Container::reference` | C++11 |
| `const_reference` | `Container::const_reference` | C++11 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|--------------------------------------|-------|
| [`operator==`](stack/op_equal.md)         | 等値比較                             | |
| [`operator!=`](stack/op_not_equal.md)     | 非等値比較                           | |
| [`operator<`](stack/op_less.md)           | 左辺が右辺より小さいかの判定を行う   | |
| [`operator<=`](stack/op_less_equal.md)    | 左辺が右辺以下かの判定を行う         | |
| [`operator>`](stack/op_greater.md)        | 左辺が右辺より大きいかの判定を行う   | |
| [`operator>=`](stack/op_greater_equal.md) | 左辺が右辺以上かの判定を行う         | |
| [`swap`](stack/swap_free.md)              | 2つの`stack`オブジェクトを入れ替える | C++11 |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------------|-------|
| [`(deduction_guide)`](stack/op_deduction_guide.md) | クラステンプレートの推論補助 | C++17 |


## 例
```cpp
#include <iostream>
#include <stack>

int main ()
{
  std::stack<int> st;

  // 要素を追加
  st.push(1);
  st.push(2);
  st.push(3);

  while (!st.empty()) {
    std::cout << st.top() << " "; // 末尾要素を参照する
    st.pop(); // 末尾要素を削除
  }
}
```
* std::stack[color ff0000]
* st.push[link stack/push.md]
* st.empty()[link stack/empty.md]
* st.pop()[link stack/pop.md]

### 出力
```
3 2 1 
```

### 参照


