#代入演算子
```cpp
vector& operator=(const vector& x);
vector& operator=(vector&& x);
vector& operator=(initializer_list<T>);
```
* initializer_list[link /reference/initializer_list.md]

##概要

<li style='font-weight:bold'><b>vector& operator=(const vector& x);要件：型Tがvectorに対して[CopyInsertable](/reference/container_concepts/copyinsertable.md)であること。効果：同じテンプレートパラメータを持つvectorクラスのオブジェクトをコピー代入する。*thisの全ての要素が解放され、xの全ての要素が*thisにコピーされる。事後条件：*this == x
</b></li><li style='font-weight:bold'><b>vector& operator=(vector&& x);効果：同じテンプレートパラメータを持つvectorクラスのオブジェクトをムーブ代入する。*thisの全ての要素が解放され、xの全ての要素が*thisにムーブされる。事後条件：*thisは元々のxと等値となる
</b></li><li><b>vector& operator=(initializer_list<T> x);</b>要件：<span style='font-weight:800'>型Tがvectorに対して<b>[CopyInsertable](/reference/container_concepts/copyinsertable.md)
</b>であること。効果：</span>同じテンプレートパラメータを持つinitializer_listクラスのオブジェクトをコピー代入する。*thisの全ての要素が解放され、xの全ての要素が*thisにコピーされる。事後条件：
*this == x</li>


##戻り値

`*this`

##計算量

線形時間


##備考



##例

```cpp
#include <cassert>
#include <vector>
#include <algorithm> // std::equal
```

int main()
{
  // コピー代入
  {
    std::vector<int> v1 = {1, 2, 3};
    std::vector<int> v2;

    v2 <color=ff0000>=</color> v1;

    assert(v1 == v2);
  }

  // ムーブ代入
  {
    std::vector<int> v1 = {1, 2, 3};
    std::vector<int> v2;

    v2 <color=ff0000>=</color> std::vector<int>(v1);

    assert(v1 == v2);
  }

  // 初期化子リストからのコピー代入
  {
    std::vector<int> v1;
    v1 <color=ff0000>=</color> {1, 2, 3};

    // 事後条件の検証:
    std::initializer_list<int> init = {1, 2, 3};
    std::vector<int> v2;
    v2 <color=ff0000>=</color> init;

    assert(v2.size() == init.size());
    assert(std::equal(v2.begin(), v2.end(), init.begin()));
  }
}




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
- [Visual C++](/implementation#visual_cpp.md) <h4>備考</h4>
(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
```

##参照
```