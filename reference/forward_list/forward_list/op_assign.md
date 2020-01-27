# operator=
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
forward_list& operator=(const forward_list& x); // (1)
forward_list& operator=(forward_list&& x);      // (2)
forward_list& operator=(forward_list&& x)
  noexcept(allocator_traits<Allocator>::is_always_equal::value); // (2) C++ 17
forward_list& operator=(initializer_list<T>);   // (3)
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
- (1) : コピー代入
- (2) : ムーブ代入
- (3) : 初期化�リストの代入


## 効果
- (1) : 同じテンプレートパラメータを持つ`forward_list`クラスのオブジェクトをコピー代入する。`*this`の全ての要素が解放され、`x`の全ての要素が`*this`にコピーされる。
- (2) : 同じテンプレートパラメータを持つ`forward_list`クラスのオブジェクトをムーブ代入する。`*this`の全ての要素が解放され、`x`の全ての要素が`*this`にムーブされる。
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
#include <forward_list>
#include <algorithm>

int main()
{
  // コピー代入
  {
    std::forward_list<int> ls1 = {1, 2, 3};
    std::forward_list<int> ls2;

    ls2 = ls1;

    assert(ls1 == ls2);
  }

  // ムーブ代入
  {
    std::forward_list<int> ls1 = {1, 2, 3};
    std::forward_list<int> ls2;

    ls2 = std::forward_list<int>(ls1);

    assert(ls1 == ls2);
  }

  // 初期化�リストからのコピー代入
  {
    std::forward_list<int> ls1;
    ls1 = {1, 2, 3};

    // 事後条件の検証:
    std::initializer_list<int> init = {1, 2, 3};
    std::forward_list<int> ls2;
    ls2 = init;

    assert(std::equal(ls2.begin(), ls2.end(), init.begin()));
  }
}
```
* ls2.begin()[link begin.md]
* ls2.end()[link end.md]
* init.begin()[link /reference/initializer_list/initializer_list/begin.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015, 2017
	- (3) `initializer_list`のオーバー�ードは2013から。


## 参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (3)の経緯となる提案文書
- [N4258 Cleaning-up noexcept in the Library, Rev 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4258.pdf)
    - `noexcept` 追加の経緯となる提案文書
