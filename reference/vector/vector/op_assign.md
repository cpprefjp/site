# operator=
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
vector& operator=(const vector& x);     // (1) C++03

vector& operator=(vector&& x);          // (2) C++11
vector& operator=(vector&& x) noexcept(
  allocator_traits<Allocator>::propagate_on_container_move_assignment::value
    || allocator_traits<Allocator>::is_always_equal::value); // (2) C++17

vector& operator=(initializer_list<T>); // (3) C++11
```
* initializer_list[link /reference/initializer_list/initializer_list.md]
* allocator_traits[link /reference/memory/allocator_traits.md]

## 概要
- (1) : コピー代入
- (2) : ムーブ代入
- (3) : 初期化�リストの代入


## テンプレートパラメータ制約
- (1), (3) : 型`T`が`vector`に対してコピー挿入可能であること


## 効果
- (1) : 同じテンプレートパラメータを持つ`vector`クラスのオブジェクトをコピー代入する。`*this`の全ての要素が解放され、`x`の全ての要素が`*this`にコピーされる。
- (2) : 同じテンプレートパラメータを持つ`vector`クラスのオブジェクトをムーブ代入する。`*this`の全ての要素が解放され、`x`の全ての要素が`*this`にムーブされる。
- (3) : 同じテンプレートパラメータを持つ`initializer_list`クラスのオブジェクトをコピー代入する。`*this`の全ての要素が解放され、`x`の全ての要素が`*this`にコピーされる。


## 戻り値
`*this`


## 事後条件
- (1) : `*this == x`
- (2) : `*this`は元々の`x`と�値となる
- (3) : `*this == x`


## 計算量
- (1) : 全要素のデストラクタ呼び出しとコピーを行うために、線形時間
- (2) : 全要素のデストラクタ呼び出しをするために、線形時間
- (3) : 全要素のデストラクタ呼び出しとコピーを行うために、線形時間


## 例
```cpp example
#include <cassert>
#include <vector>
#include <algorithm>
#include <utility>

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

    std::vector<int> copied_v1 = v1;
    v2 = std::move(v1);

    assert(copied_v1 == v2);
  }

  // 初期化�リストからのコピー代入
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
* std::move[link /reference/utility/move.md]
* init.size()[link /reference/initializer_list/initializer_list/size.md]
* init.begin()[link /reference/initializer_list/initializer_list/begin.md]
* std::equal[link /reference/algorithm/equal.md]

### 出力
```
```


## 参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (3)の経緯となる提案文書
- [N4258 Cleaning-up noexcept in the Library, Rev 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4258.pdf)
    - `noexcept` 追加の経緯となる提案文書
