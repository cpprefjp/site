#stack
```cpp
namespace std {
  template <class T, class Container = deque<T>>
  class stack;
}
```
* deque[link /reference/deque.md]

<b>概要</b>

stack はコンテナアダプタであり、LIFO (last-in first-out) の動作――コンテナの一方から要素が挿入され、挿入された側から要素を取り出す――を実現する目的で設計されている。要素をコンテナの back() 側から挿入し、同じく back() 側から取り出す。

stack は、所定のメンバ関数を持つコンテナのオブジェクトを内部実装として用いており、標準のコンテナ、もしくは独自に実装したコンテナを指定することができる。
このコンテナに必要な要件は、以下のメンバ関数を持つことである。


- back()
- push_back()
- pop_back()
- emplace_back() (C++11)
この要件を満たすものとしては vector 、deque 、list があり、デフォルトでは deque が使用される。

stack は2つのテンプレート引数を持つ。
各テンプレートパラメータの意味は以下の通りである。

<ol>
- T: 格納される要素の型
- Container: 要素へのアクセス・保存に用いる内部実装のコンテナクラス</ol>

以下のリファレンス中では、テンプレート引数として同じ名前を用いる。


###メンバ関数

| | |
|-------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| [(constructor)](./stack/stack.md) | コンストラクタ |
| [(destructor)](./stack/stack-1.md) | デストラクタ |
| [operator=](./stack/op_assign.md) | 代入 |
| [top](./stack/top.md) | 次の要素へアクセスする |
| [empty](./stack/empty.md) | 要素が空であるかを確認する |
| [size](./stack/size.md) | 要素数を取得する |
| [push](./stack/push.md) | 要素を追加する |
| [emplace](./stack/emplace.md) | 直接構築で要素を追加する(C++11) |
| [pop](./stack/pop.md) | 次の要素を削除する |
| [swap](./stack/swap.md) | 他の stack オブジェクトと値を入れ替える(C++11) |

<b></b>
<b>protectedメンバ変数</b>

| | |
|------------------------|------------------------|
| `変数名` | `型` |
| `c` | `Container` |

<h4>メンバ型</h4>

| | |
|-----------------|----------------------------|
| container_type | Container |
| value_type | Container::value_type |
| size_type | Container::size_type |
| reference | Container::reference |
| const_reference | Container::const_reference |



###<h3>非メンバ関数



| | |
|---------------------------------------------------------------------------------------------------------------|---------------------------------------------------------|
| [`operator==`](./stack/op_equal.md) | 等値比較 |
| [`operator!=`](./stack/op_not_equal.md) | 非等値比較 |
| [`operator<`](./stack/op_less.md) | 左辺が右辺より小さいかの判定を行う |
| [`operator<=`](./stack/op_less_equal.md) | 左辺が右辺以下かの判定を行う |
| [`operator>`](./stack/op_greater.md) | 左辺が右辺より大きいかの判定を行う |
| [`operator>=`](./stack/op_greater_equal.md) | 左辺が右辺以上かの判定を行う |
| [`swap`](./stack/swap_free.md) | 2つのstackオブジェクトを入れ替える(C++11) |

</h3>

##例
```cpp
<pre style='margin-top:0px;margin-bottom:0px;padding-bottom:5px;padding-top:3px;padding-left:10px;line-height:normal;background-color:rgb(240,240,240)'>#include <iostream>
#include <stack>

int main ()
{
  std::stack<int>  st;

  // 要素を追加
  st.push(1);
  st.push(2);
  st.push(3);

  while (!st.empty()) {
    std::cout << st.top() << " "; // 末尾要素を参照する
    st.pop(); // 末尾要素を削除
  }
}</pre>
```

###出力
```cpp
3 2 1 
```

###参照


