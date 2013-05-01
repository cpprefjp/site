#代入演算子
```cpp
list& operator=(const list& x);
```

// C++11から追加された代入演算子
list& operator=(list&& x);
list& operator=(initializer_list<T> x);




##概要

- <b>list& operator=(const list& x);コピー代入。同じテンプレートパラメータを持つ list クラスのオブジェクトをコピー代入する。*this の全ての要素が解放され、x の全ての要素が *this にコピーされる。</b>
- <b>list& operator=(list&& x);ムーブ代入。同じテンプレートパラメータを持つ list クラスのオブジェクトをムーブ代入する。*this の全ての要素が解放され、x の全ての要素が *this にムーブされる。</b>
- <b>list& operator=(initializer_list<T> x);同じテンプレートパラメータを持つ initializer_list クラスのオブジェクトをコピー代入する。*this の全ての要素が解放され、x の全ての要素が *this にコピーされる。</b>


##戻り値

*this


##例

```cpp
#include <cassert>
#include <list>
#include <algorithm>  // std::equal

int main ()
{
  // コピー代入
  {
    std::list<int>  ls1  =  { 1, 2, 3 };
    std::list<int>  ls2;

    ls2  =  ls1;

    assert(ls1 == ls2);
  }

  // ムーブ代入
  {
    std::list<int>  ls1  =  { 1, 2, 3 };
    std::list<int>  ls2;

    ls2  =  std::list<int>(ls1);

    assert(ls1 == ls2);
  }

  // 初期化子リストからのコピー代入
  {
    std::list<int>  ls1;
    ls1  =  { 1, 2, 3 };

    // 事後条件の検証
    std::initializer_list<int>  init  =  { 1, 2, 3 };
    std::list<int>  ls2;
    ls2  =  init;

    assert(std::equal(ls2.begin(), ls2.end(), init.begin()));
  }
}
```
* =[color ff0000]
* =[color ff0000]
* =[color ff0000]
* =[color ff0000]

###出力

```cpp
```

##参照
```