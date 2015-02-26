#コンストラクタ
* stack[meta header]
* std[meta namespace]
* stack[meta class]
* function[meta id-type]

```cpp
// C++03 まで
explicit stack(const Container& cont = Container());
stack(const stack& st);

// C++11 から
explicit stack(const Container& cont);
stack(const stack& st);
explicit stack(Container&& cont = Container());
stack(stack&& st);
template <class Allocator> explicit stack(const Allocator& alloc);
template <class Allocator> stack(const Container& cont, const Allocator& alloc);
template <class Allocator> stack(Container&& cont, const Allocator& alloc);
template <class Allocator> stack(const stack& st, const Allocator& alloc);
template <class Allocator> stack(stack&& st, const Allocator& alloc);
```

##概要
`stack` コンテナアダプタのオブジェクトを構築する。 
コンテナアダプタは、実際にデータを保持するコンテナオブジェクトを内部に持つが、これは引数として渡されたコンテナオブジェクトをコピー、もしくはムーブして用いる。 
空のコンテナが引数として渡された場合も同様の動作を行う。


##パラメータ
- `cont`  
	初期化に用いるコンテナオブジェクト
- `alloc`  
	内部のコンテナで使用するアロケータオブジェクト
- `st`  
	コピー・ムーブ元の `stack` オブジェクト


##計算量
線形時間 O(n)。


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

