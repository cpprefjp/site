#offsetof
```cpp
offsetof(type, member)
```

##概要

　このマクロ関数は、構造体型 <i>type </i>のメンバ <i>member </i>へのオフセット値をバイト数で返す。


　この構造体の先頭から <i>member </i>へのバイト数が、size_t 型の符号なし整数値で返される。


　C++ での構造体の機能的拡張のため、offsetof の利用は、C の構造体のコンセプトに対応する POD のクラス型に制限される（但し、public な非仮想メンバ関数のみを持ち、コンストラクタ及びデストラクタを持たない無い非派生クラスも POD である）。


##パラメータ

<p style='text-indent:1em'>type</p>
<p style='text-indent:2em'><i>member</i> を有効なメンバ指示子とするクラス型</p>
<p style='text-indent:1em'>member</p>
<p style='text-indent:2em'>クラス <i>type</i> のメンバ指示子</p>



##戻り値

　<i>type </i>中の <i>member </i>へのオフセット値を示す size_t 型の値



##例

```cpp
#include <cstdio>
#include <cstddef>

struct mystruct {
  char singlechar;
  char arraymember[10];
  char anotherchar;
};

int main ()
{
  printf ("offsetof(mystruct,singlechar) is %d\n", offsetof(mystruct,singlechar));
  printf ("offsetof(mystruct,arraymember) is %d\n", offsetof(mystruct,arraymember));
  printf ("offsetof(mystruct,anotherchar) is %d\n", offsetof(mystruct,anotherchar));
}
```
* offsetof[color ff0000]
* offsetof[color ff0000]
* offsetof[color ff0000]

###出力

```cpp
<pre style='margin-top:0px;margin-bottom:0px;color:rgb(0,0,0);font-size:12px;line-height:normal;background-color:rgb(231,231,231)'><samp>offsetof(mystruct,singlechar) is 0
offsetof(mystruct,arraymember) is 1
offsetof(mystruct,anotherchar) is 11</samp></pre>
```


