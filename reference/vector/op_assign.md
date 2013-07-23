#代入演算子
```cpp
vector& operator=(const vector& x);
vector& operator=(vector&& x);          // C++11から
vector& operator=(initializer_list<T>); // C++11から
```
* initializer_list[link /reference/initializer_list.md]

##概要
- `vector& operator=(const vector& x);`

要件：型`T`が`vector`に対して[`CopyInsertable`](/reference/container_concepts/copyinsertable.md)であること。

効果：同じテンプレートパラメータを持つ`vector`クラスのオブジェクトをコピー代入する。`*this`の全ての要素が解放され、`x`の全ての要素が`*this`にコピーされる。

事後条件：`*this == x`


- `vector& operator=(vector&& x);`

効果：同じテンプレートパラメータを持つ`vector`クラスのオブジェクトをムーブ代入する。`*this`の全ての要素が解放され、`x`の全ての要素が`*this`にムーブされる。

事後条件：`*this`は元々の`x`と等値となる


- `vector& operator=(initializer_list<T> x);`

要件：型`T`が`vector`に対して[`CopyInsertable`](/reference/container_concepts/copyinsertable.md)であること。

効果：同じテンプレートパラメータを持つ`initializer_list`クラスのオブジェクトをコピー代入する。`*this`の全ての要素が解放され、`x`の全ての要素が`*this`にコピーされる。

事後条件：`*this == x`


##戻り値
`*this`


##計算量
線形時間


##例
```cpp
#include <cassert>
#include <vector>
#include <algorithm> // std::equal

int main()
{
  // コピー代入
  {
    std::vector<int> v1 = {1, 2, 3};
    std::vector<int> v2;

    v2 = v1;

    assert(v1 == v2);
  }

  // ムーブ代入
  {
    std::vector<int> v1 = {1, 2, 3};
    std::vector<int> v2;

    v2 = std::vector<int>(v1);

    assert(v1 == v2);
  }

  // 初期化子リストからのコピー代入
  {
    std::vector<int> v1;
    v1 = {1, 2, 3};

    // 事後条件の検証:
    std::initializer_list<int> init = {1, 2, 3};
    std::vector<int> v2;
    v2 = init;

    assert(v2.size() == init.size());
    assert(std::equal(v2.begin(), v2.end(), init.begin()));
  }
}
```

###出力
```
```


