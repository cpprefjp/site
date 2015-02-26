#operator=
* vector[meta header]
* std[meta namespace]

```cpp
vector& operator=(const vector& x);     // (1) C++03
vector& operator=(vector&& x);          // (2) C++11
vector& operator=(initializer_list<T>); // (3) C++11
```
* initializer_list[link /reference/initializer_list.md]

##概要
- (1) : コピー代入
- (2) : ムーブ代入
- (3) : 初期化子リストの代入


##要件
- (1) : 要件：型`T`が`vector`に対して[`CopyInsertable`](/reference/container_concepts/copyinsertable.md)であること。
- (3) : 型`T`が`vector`に対して[`CopyInsertable`](/reference/container_concepts/copyinsertable.md)であること。


##効果
- (1) : 同じテンプレートパラメータを持つ`vector`クラスのオブジェクトをコピー代入する。`*this`の全ての要素が解放され、`x`の全ての要素が`*this`にコピーされる。
- (2) : 同じテンプレートパラメータを持つ`vector`クラスのオブジェクトをムーブ代入する。`*this`の全ての要素が解放され、`x`の全ての要素が`*this`にムーブされる。
- (3) : 同じテンプレートパラメータを持つ`initializer_list`クラスのオブジェクトをコピー代入する。`*this`の全ての要素が解放され、`x`の全ての要素が`*this`にコピーされる。


##戻り値
`*this`


##事後条件
- (1) : `*this == x`
- (2) : `*this`は元々の`x`と等値となる
- (3) : `*this == x`


##計算量
- (1) : 全要素のデストラクタ呼び出しとコピーを行うために、線形時間
- (2) : 全要素のデストラクタ呼び出しをするために、線形時間
- (3) : 全要素のデストラクタ呼び出しとコピーを行うために、線形時間


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


