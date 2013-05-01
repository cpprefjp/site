#代入演算子
```cpp
forward_list& operator=(const forward_list& x);
forward_list& operator=(forward_list&& x);
forward_list& operator=(initializer_list<T>);
```
* initializer_list[link /reference/initializer_list.md]

##概要
<li>`forward_list& operator=(const forward_list& x);`コピー代入。同じテンプレートパラメータを持つ`forward_list`オブジェクトをコピー代入する。`*this`の全ての要素が解放され、`x`の全ての要素が`*this`にコピーされる。
</li><li>`forward_list& operator=(forward_list&& x);`ムーブ代入。
同じテンプレートパラメータを持つ`forward_list`オブジェクトをムーブ代入する。`*this`の全ての要素が解放され、`x`の全ての要素が`*this`にムーブされる。</li><li>`forward_list& operator=([initializer_list](/reference/initializer_list.md)<T>);`同じ要素型を持つ`initializer_list`クラスのオブジェクトをコピー代入する。`*this`の全ての要素が解放され、`x`の全ての要素が`*this`にコピーされる。
</li>


##戻り値

*this



##例

```cpp
#include <cassert>
#include <forward_list>
#include <algorithm> // std::equal

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

  // 初期化子リストからのコピー代入
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

###出力

```cpp
```

##バージョン
```
###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??



##参照


