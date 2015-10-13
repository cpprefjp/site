#コンストラクタ
* stack[meta header]
* std[meta namespace]
* stack[meta class]
* function[meta id-type]

```cpp
explicit stack(const Container& cont = Container());  // (1) C++03まで
explicit stack(Container&& cont = Container());       // (2) C++11
explicit stack(const Container& cont);                // (3) C++11

stack(const stack& st);                               // (4)
stack(stack&& st);                                    // (5) C++11

template <class Allocator>
explicit stack(const Allocator& alloc);               // (6) C++11

template <class Allocator>
stack(const Container& cont, const Allocator& alloc); // (7) C++11

template <class Allocator>
stack(Container&& cont, const Allocator& alloc);      // (8) C++11

template <class Allocator>
stack(const stack& st, const Allocator& alloc);       // (9) C++11

template <class Allocator>
stack(stack&& st, const Allocator& alloc);            // (10) C++11
```

##概要
- (1) : デフォルトコンストラクタ。元となるコンテナのコピーを受け取る。
- (2) : デフォルトコンストラクタ。元となるコンテナの一時オブジェクトをムーブで受け取る。
- (3) : 元となるコンテナのコピーを受け取るコンストラクタ。
- (4) : コピーコンストラクタ。
- (5) : ムーブコンストラクタ。
- (6) : アロケータを受け取るコンストラクタ。
- (7) : 元となるコンテナのコピーとアロケータを受け取るコンストラクタ。
- (8) : 元となるコンテナの一時オブジェクトとアロケータを受け取るコンストラクタ。
- (9) : アロケータを受け取るコピーコンストラクタ。
- (10) : アロケータを受け取るムーブコンストラクタ。


##効果
- (2) : メンバ変数`c`を[`std::move`](/reference/utility/move.md)`(cont)`で初期化する。
- (3) : メンバ変数`c`を`cont`のコピーで初期化する。
- (6) : メンバ変数`c`のメモリアロケートに`alloc`を使用する。
- (7) : メンバ変数`c`を`Container(cont, alloc)`で初期化する。
- (8) : メンバ変数`c`を`Container(`[`std::move`](/reference/utility/move.md)`(cont), alloc)`で初期化する。
- (9) : メンバ変数`c`を`Container(st.c, alloc)`で初期化する。
- (10) : メンバ変数`c`を`Container(`[`std::move`](/reference/utility/move.md)`(st.c), alloc)`で初期化する。


##例
```cpp
#include <iostream>
#include <utility>
#include <vector>
#include <stack>

int main ()
{
  // デフォルトでは Container == deque<T>
  std::vector<int>  vec;

  // 要素を追加
  vec.push_back(1);
  vec.push_back(2);
  vec.push_back(3);

  // vec を引数に構築
  std::stack<int, std::vector<int>>  st(std::move(vec));

  while (!st.empty()) {
    std::cout << st.top() << " "; // 末尾要素を参照する
    st.pop(); // 末尾要素を削除
  }
}
```

###出力
```
3 2 1 
```

##参照

| | |
|-------------------------------------------------------------------------------------------|---------------------------------------------------------------|
| [`operator=`](./op_assign.md) | 代入 |

