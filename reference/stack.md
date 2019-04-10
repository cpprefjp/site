# stack
* stack[meta header]

`stack` はコンテナアダプタであり、LIFO (last-in first-out) の動作――コンテナの一方から要素が挿入され、挿入された側から要素を取り出す――を実現する目的で設計されている。要素をコンテナの `back()` 側から挿入し、同じく `back()` 側から取り出す。

`stack` は、所定のメンバ関数を持つコンテナのオブジェクトを内部実装として用いており、標準のコンテナ、もしくは独自に実装したコンテナを指定することができる。
このコンテナに必要な要件は、以下のメンバ関数を持つことである。

- `back()`
- `push_back()`
- `pop_back()`
- `emplace_back()` (C++11)

この要件を満たすものとしては [`vector`](/reference/vector.md) 、[`deque`](/reference/deque/deque.md) 、[`list`](/reference/list/list.md) があり、デフォルトでは [`deque`](/reference/deque/deque.md) が使用される。

このヘッダでは、以下の標準ヘッダをインクルードする：

- [`<initializer_list>`](initializer_list.md) (C++11)


| 名前 | 説明 | 対応バージョン |
|---------------------------------|--------------------------------------------|-------|
| [`stack`](stack/stack.md)           | LIFOスタック(class template) |  |

