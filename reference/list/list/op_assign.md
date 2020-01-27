# operator=
* list[meta header]
* std[meta namespace]
* list[meta class]
* function[meta id-type]

```cpp
list& operator=(const list& x);         // (1)
list& operator=(list&& x);              // (2) C++11
list& operator=(list&& x)
  noexcept(allocator_traits<Allocator>::is_always_equal::value); // (2) C++17
list& operator=(initializer_list<T> x); // (3) C++11
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
- (1) : コピー代入。
- (2) : ムーブ代入。
- (3) : 初期化�リストを代入。


## 効果
- (1) : 同じテンプレートパラメータを持つ `list` クラスのオブジェクトをコピー代入する。`*this` の全ての要素が解放され、`x` の全ての要素が `*this` にコピーされる。
- (2) : 同じテンプレートパラメータを持つ `list` クラスのオブジェクトをムーブ代入する。`*this` の全ての要素が解放され、`x` の全ての要素が `*this` にムーブされる。
- (3) : 同じテンプレートパラメータを持つ `initializer_list` クラスのオブジェクトをコピー代入する。`*this` の全ての要素が解放され、`x` の全ての要素が `*this` にコピーされる。


## 戻り値
`*this`


## 計算量
- (1) : 全要素のデストラクタ呼び出しとコピーを行うために、線形時間
- (2) : 全要素のデストラクタ呼び出しをするために、線形時間
- (3) : 全要素のデストラクタ呼び出しとコピーを行うために、線形時間


## 例
```cpp example
#include <cassert>
#include <list>
#include <algorithm>

int main ()
{
  // コピー代入
  {
    std::list<int> ls1 = { 1, 2, 3 };
    std::list<int> ls2;

    ls2 = ls1;

    assert(ls1 == ls2);
  }

  // ムーブ代入
  {
    std::list<int> ls1 = { 1, 2, 3 };
    std::list<int> ls2;

    ls2  =  std::list<int>(ls1);

    assert(ls1 == ls2);
  }

  // 初期化�リストからのコピー代入
  {
    std::list<int> ls1;
    ls1 = { 1, 2, 3 };

    // 事後条件の検証
    std::initializer_list<int> init = { 1, 2, 3 };
    std::list<int> ls2;
    ls2 = init;

    assert(std::equal(ls2.begin(), ls2.end(), init.begin()));
  }
}
```
* std::equal[link /reference/algorithm/equal.md]
* ls2.begin()[link begin.md]
* ls2.end()[link end.md]
* init.begin()[link /reference/initializer_list/initializer_list/begin.md]

### 出力
```
```

## 参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (3)の経緯となる提案文書
- [N4258 Cleaning-up noexcept in the Library, Rev 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4258.pdf)
    - `noexcept` 追加の経緯となる提案文書
