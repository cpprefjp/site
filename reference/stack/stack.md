#stack
```cpp
explicit stack(const Container& cont = Container());
stack(const stack& st);​

// C++11から追加されたコンストラクタ
​explicit stack(Container&& cont = Container());​​stack(stack&& st);​
template <class Allocator>  explicit stack(const Allocator& alloc);​
template <class Allocator>  stack(const Container& cont, const Allocator& alloc);​
​template <class Allocator>  stack(Container&& cont, const Allocator& alloc);​
template <class Allocator>  stack(const stack& st, const Allocator& alloc);​
template <class Allocator>  stack(stack&& st, const Allocator& alloc);​
```

##概要

<b>stack コンテナアダプタのオブジェクトを構築する。
コンテナアダプタは、実際にデータを保持するコンテナオブジェクトを内部に持つが、
これは引数として渡されたコンテナオブジェクトをコピー、もしくはムーブして用いる。
</b><b>空のコンテナが引数として渡された場合も同様の動作を行う。
</b>　

<span style='background-color:rgb(239,239,239)'><span style='line-height:13px'><b>引数</b></span>cont: 初期化に用いるコンテナオブジェクト alloc: 内部のコンテナで使用するアロケータオブジェクトst: コピー・ムーブ元の stack オブジェクト 

</span>計算量

線形 O(n)。

<b>備考</b>



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

```cpp
3 2 1 
```

##参照

| | |
|-------------------------------------------------------------------------------------------|---------------------------------------------------------------|
| <br/>[operator=](/reference/stack/op_assign.md) | <br/>コンテナのコピー・ムーブ (publicメンバ関数) |

